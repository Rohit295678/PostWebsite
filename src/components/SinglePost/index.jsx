import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SinglePost() {
    const param = useParams();
    const [post,setPost] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/api/post";
                const { data: response } = await axios.get(url, { headers: { id: param.id } });
			    setPost(response)
            } catch (error) {
                console.log(error);
            }
        };

        if (param) {
            fetchData();
        }
    },[param])
  return (
    <div className="flex-9">
      <div className="p-5">
        <img
          className="w-full h-96 rounded-5 object-cover"
          src={post.img}
          alt=""
        />
        <h1 className="text-center m-2.5 text-2xl font-serif">
          {post.title}
          <div className="float-right text-lg">
            <i className="ml-2.5 cursor-pointer text-teal-500 far fa-edit"></i>
            <i className="ml-2.5 cursor-pointer text-red-500 far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="mb-5 flex justify-between text-base text-yellow-500 font-varela">
          <span>
            Author:
            <b className="ml-1.5">
              <Link className="link" to="#">
                {post.name}
              </Link>
            </b>
          </span>
          <span className="mr-8"><span>Post on:</span> {post.createdAt?.slice(2,10)}</span>
        </div>
        <p className="text-gray-600 text-lg leading-6">
          <span className="text-3xl font-semibold mr-1">L</span>orem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
          quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
          eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
          impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
          odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos!
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
          quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
          eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
          impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
          odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur.
        </p>
      </div>
    </div>
  );
}