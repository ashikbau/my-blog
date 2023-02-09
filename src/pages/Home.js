import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';



import Blogs from '../components/Blogs';
import Search from '../components/Search';

const Home = () => {
    const [data,setData] = useState([]);
    
    const [search,setSearch] = useState(" ")
    
    
    


    useEffect(()=>{
        fetch('http://localhost:5000/blogs')
      
        .then(res=>res.json())
        .then(data=>setData(data))
    },[setData])
    
   
    const handleDelete = async(_id)=>{
       
        const proceed = window.confirm('Are you sure, you want to delete this blog');
        if (proceed) {
            fetch(`http://localhost:5000/blogs/${_id}`, {
                method: 'DELETE',
               
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        loadBlogData();
                       toast.warning('Blog are deleted successfully');
                        const remaining = data.filter(dt => dt._id !== _id);
                        setData(remaining);
                    }
                })
        }
    }

    const loadBlogData=async()=>{
        fetch('http://localhost:5000/blogs')
        .then(res=>res.json())
        .then(data=>setData(data))

    }
    const excerpt =str=>{
        if(str.length > 50){
            str = str.substring(0,50) + " ... "
        }
        return str;
    }

    const onInputChange =(e)=>{
        if(!e.target.value){
            loadBlogData();
        }
        setSearch(e.target.value);
        
    }

    const handleSearch= async(e)=>{
        console.log('I ma serach',search)
       
        e.preventDefault();
        const res = await axios.get(`http://localhost:5000/blogs?text=${search}`)
        
        
        if(res.status === 200){
            setData(res.data)
            console.log(res.data)
        } else{
            toast.error('Something Went wrong')
        }
    }

    return (
        <div>
            <>
            <Search search={search} onInputChange={onInputChange} handleSearch={handleSearch} ></Search>
           <MDBRow>
            { 
                data.length === 0 && (
                    <MDBTypography className='text-center mb-0 ' tag='h2'>
                        No Blog Found

                    </MDBTypography>
                )
            }
            <MDBCol>
                <MDBContainer>
                    <MDBRow>
                        {
                            data && data.map((item)=><Blogs
                            key={item._id}
                            item={item}
                            handleDelete  ={handleDelete }
                    excerpt={excerpt}
                            ></Blogs>)
                        }
                    </MDBRow>
                </MDBContainer>
            </MDBCol>
           </MDBRow>
            </>
        </div>
    );
};

export default Home;