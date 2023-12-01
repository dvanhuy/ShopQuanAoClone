import axios from 'axios';

async function getData(url, method = 'get', data) {
  try {
    // const res = await axios.get(url);
    // return res.data;
    const res = await axios({
      method: method,
      url: url,
      data: data
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export { getData };
