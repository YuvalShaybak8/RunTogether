import axios from "axios";

export default axios.create({ baseURL: `http://192.168.3.5:5000` }); // yuval pc

// export default axios.create({ baseURL: `http://172.20.10.2:5000` }); // yuval iphone up

// export default axios.create({ baseURL: `http://10.100.102.5:5000` }); // tal pc

// export default axios.create({ baseURL: "http://172.20.10.4:5000" }); // tal's phone ip
