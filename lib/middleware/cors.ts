import Cors from 'cors'
import nc from 'next-connect';
import { ExtendedRequest, ExtendedResponse } from "../next-connect.types";

// Initializing the cors middleware
const cors_dep = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
})


const cors = nc<ExtendedRequest, ExtendedResponse>();
cors.use(cors_dep);

export default cors;