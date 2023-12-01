<?php

namespace App\Http\Controllers\Api_admin;

use App\Http\Controllers\Controller;
use App\Models\DetailReceipt;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Size;
use App\Models\Variation;
use App\Models\Image;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // return Product::all();
        $pageSize = 10;
        if ($request->pageSize) {
            $pageSize = $request->pageSize;
        }
        $listProduct = DB::table('product')
            ->join('category', 'product.categoryId', '=', 'category.Id')
            ->where('product.deleted', '=', 0)
            ->where('product.name', 'LIKE', '%' . $request->keyword . '%')
            ->select('product.*', 'category.name AS categoryName')
            ->paginate($pageSize);
        return $listProduct;
    }

    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->img = $request->img;
        $product->categoryId = $request->categoryId;
        $product->deleted = $request->deleted;

        $product->save();

        $listVariant = $request->variant;
        foreach ($listVariant as $item) {
            $variant = new Variation();
            $variant->productId = $product->id;
            $variant->colorId = $item["colorId"];
            $variant->thumbnail = $item["thumbnail"];
            $variant->deleted = $item["deleted"];

            $variant->save();

            $listSize = $item["sizes"];
            foreach ($listSize as $s) {
                $sizeVariant = new Size();
                $sizeVariant->variantId = $variant->id;
                $sizeVariant->size = $s["size"];
                $sizeVariant->quantity = $s["quantity"];
                $sizeVariant->deleted = $s["deleted"];

                $sizeVariant->save();
            }

            $listImage = $item["images"];
            foreach ($listImage as $img) {
                $image = new Image();
                $image->variantId = $variant->id;
                $image->url = $img["url"];
                $image->deleted = $img["deleted"];

                $image->save();
            }
        }
    }

    public function show($id)
    {
        // return Product::find($id);
        $product = DB::table('product')
            ->where('product.id', '=', $id)->first();

        $variants = DB::table('variation')
            ->join('color', 'variation.colorId', '=', 'color.Id')
            ->where('variation.productId', '=', $product->id)
            ->select('variation.*', 'color.name AS colorName')->get();
        foreach ($variants as $variant) {
            $variant->Sizes = DB::table('size')
                ->where('size.variantId', '=', $variant->id)->get();
            $variant->Images = DB::table('image')
                ->where('image.variantId', '=', $variant->id)->get();
        }
        $product->Variants = $variants;
        return $product;
    }


    public function update(Request $request, $id)
    {
        $product = Product::find($request->id);

        //delete variant, size, image
        $variants = DB::table('variation')
            ->where('variation.productId', '=', $product["id"])->get();

        foreach ($variants as $variant) {

            $oldVariant = Variation::find($variant->id);
            $oldVariant->deleted = 1;
            $oldVariant->save();

            DB::table('size')
                ->where('size.variantId', '=', $variant->id)->delete();

            DB::table('image')
                ->where('image.variantId', '=', $variant->id)->delete();
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->img = $request->img;
        $product->categoryId = $request->categoryId;
        $product->deleted = $request->deleted;

        $product->save();

        $listVariant = $request->variant;
        foreach ($listVariant as $item) {
            $variant = new Variation();
            $variant->productId = $product->id;
            $variant->colorId = $item["colorId"];
            $variant->thumbnail = $item["thumbnail"];
            $variant->deleted = $item["deleted"];

            $variant->save();

            $listSize = $item["sizes"];
            foreach ($listSize as $s) {
                $sizeVariant = new Size();
                $sizeVariant->variantId = $variant->id;
                $sizeVariant->size = $s["size"];
                $sizeVariant->quantity = $s["quantity"];
                $sizeVariant->deleted = $s["deleted"];

                $sizeVariant->save();
            }
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->deleted = 1;
        $rs = $product->save();
        if ($rs) {
            return "200";
        } else {
            return "500";
        }
    }
}
