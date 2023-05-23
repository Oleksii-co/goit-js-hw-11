import './css/styles.css';

import { searchImages } from './api';






searchImages("cat").then((res)=>{console.log(res);})