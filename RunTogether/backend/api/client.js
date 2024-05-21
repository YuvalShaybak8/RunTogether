import axios from "axios";
import Constants from "expo-constants";

// const { expoConfig } = Constants;
// const IP = expoConfig.extra.IP;
// const IP2 = process.env.IP;

// export default axios.create({ baseURL: `http://192.168.3.5:5000` });

// export default axios.create({ baseURL: `http://172.20.10.2:5000` });

export default axios.create({ baseURL: `http://10.100.102.5:5000` });

// export default axios.create({ baseURL: "http://172.20.10.4:5000" }); // tal's phone ip
