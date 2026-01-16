import { useParams } from "react-router-dom";


const BranchService =() => {
    const {place} = useParams();
    console.log(place);
    return <div>Branch service will Show here...</div>;
};

export default BranchService;
