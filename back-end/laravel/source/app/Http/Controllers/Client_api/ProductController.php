<?php

namespace App\Http\Controllers\Client_api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use stdClass;
use TheSeer\Tokenizer\Exception;

class ProductController extends Controller
{
    protected $productRepository;

    public function __construct(\App\Repositories\Interfaces\ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        $products = $this->productRepository->all();

        return response(
            [
                'data'=> $products
            ]
        );
    }
    

     public function filter_products(Request $request){
        try{
            $products = $this->productRepository->product_filter($request->cateId, $request->start, $request->colors, 
            $request->sizes, $request->sort, $request->price, $request->limit);

            return response(
                [
                    'total'=> $products['total'],
                    'products'=>$products['products']
                ]
            );
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    public function get_product(Request $request){
        try{
            $products = $this->productRepository->get_product($request->productId);
            if(count((array)$products) > 0){
                return response($products);
            }
            return response()->json(new stdClass());
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    public function get_weekly_best_product(Request $request)
    {
        try{
            $defaultlimit = $request->limit;
            $defaultcateId = $request->cateId;
            if($request->limit == "," || $request->cateId == ","){
                $defaultlimit = 10;
                $defaultcateId = 0;
            }
            $products = $this->productRepository->get_weekly_best_product($defaultlimit, $defaultcateId);
            return response($products);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        }
    }

    

    public function get_new_product(Request $request)
    {

        try{
            $defaultlimit = $request->limit;
            $defaultcateId = $request->cateId;
            if($request->limit == "," || $request->cateId == ","){
                $defaultlimit = 10;
                $defaultcateId = 0;
            }
            $products = $this->productRepository->get_new_product($defaultlimit, $defaultcateId);
            return response($products);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    

    public function search_products(Request $request){
        try{
            $products = $this->productRepository->search_products($request->searchStr, $request->limit);
            return response($products);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    public function get_max_price(){
        try{
            $max_price = $this->productRepository->get_max_price();
            return response($max_price);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    public function get_productsCollection(Request $request){
        try{
            $product_collection = $this->productRepository->get_productsCollection($request->collectionId, $request->start);
            return response($product_collection);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }

    public function get_productsSale(Request $request){
        try{
            $productsSale = $this->productRepository->get_productsSale($request->salesId, $request->size, $request->cateId, $request->start);
            return response($productsSale);
        }
        catch(Exception $e){
            return response([
                'status'=>'Bad Request'
            ]);
        } 
    }
}
