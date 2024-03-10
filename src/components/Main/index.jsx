import { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";
import Sidebar from "../Sidebar";

const Main = ({email}) => {
	const [post,setPost] = useState([])

	useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/api/posts";
                const { data: response } = await axios.get(url);
				setPost(response)
            } catch (error) {
                console.log(error);
            }
        };

        if (email) {
            fetchData();
        }
    }, [email]);
 
	const [currentPage, setCurrentPage] = useState(1)
	const recordsPerPage = 4;
	const lastIndex = currentPage*recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = post.slice(firstIndex, lastIndex);
	const npage = Math.ceil(post.length/recordsPerPage);
	const numbers = [...Array(npage+1).keys()].slice(1);
    
	const prePage = ()=>{
		if(currentPage !== firstIndex){
			setCurrentPage(currentPage-1)
		}
	}

	const nextPage =()=>{
		if(currentPage !== lastIndex){
			setCurrentPage(currentPage+1)
		}
	}

	return (
		<>
		<div className="flex lg:flex-row flex-col">
		<div className="flex flex-wrap m-5">
	   {post.length>0 && records.map((item)=><Post key={item.userId} data={item} />)}
    </div>
	<Sidebar />
	</div>
	<nav className="flex justify-center my-4">
    <ul className="flex space-x-2">
        <li>
            <button onClick={prePage} className="py-2 px-4 shadow-xl bg-gray-200 hover:bg-gray-300 rounded-full">
                Prev
            </button>
        </li>
        {numbers.map((n, i) => (
            <li key={i}>
                <button onClick={() => setCurrentPage(n)} className={`py-2 px-4 ${currentPage === n ? 'bg-teal-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} shadow-xl rounded-full`}>
                    {n}
                </button>
            </li>
        ))}
        <li>
            <button onClick={nextPage} className="py-2 px-4 shadow-xl bg-gray-200 hover:bg-gray-300 rounded-full">
                Next
            </button>
        </li>
    </ul>
</nav>

	</>
	);
};

export default Main;