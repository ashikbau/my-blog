import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const Blog = () => {
    const [singleBlog,setSingleBlog] = useState();
    const[relatedPost,setRelatedPost]=useState([])
    const {id}= useParams();
    // console.log(id,category)

    useEffect(()=>{
        if(id){
            getSingleBlog(id);
        }
    },[id])

    const getSingleBlog = async(id)=>{
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        const relatedPostData = await axios.get(`http://localhost:5000/blogs?category=${res.data.category}`);
       console.log(relatedPost)
        console.log(relatedPostData)
        if(res.status === 200 ){
            setRelatedPost(relatedPostData.data)
           
            setSingleBlog(res.data)
            console.log(res)
        } else{
            toast.error('Something went wrong')
        }
    }

    const excerpt =str=>{
        if(str.length > 60){
            str = str.substring(0,60) + " ... "
        }
        return str;
    }
// console.log(singleBlog)

    const styleInfo = {
        display: 'inline',
        marginLeft:'5px',
        float: 'right',
        marginTop: '7px'
    }
    return (
        <MDBContainer style={{border: '1px solid #d1ebe8'}}>
            <Link to='/'>
                <strong style={{float:'left',color:'black'}} className='mt-3'>
                    Go Back
                </strong>
            </Link>
            <MDBTypography tag='h2' className='text-muted mt-2'b style={{display:'inline-block'}}>{singleBlog && singleBlog.title}</MDBTypography>
            <MDBTypography>
                <img 
                src={singleBlog && singleBlog.imageUrl}
                className='image-fluid rounded'
                 alt="singleBlog.imageUrl"
                 style={{width:'100%',maxHeight:'600px'}}
                 
                 />
                 </MDBTypography>
                 <div style={{marginTop:"20px"}}>
                    <div style={{height:'43px',background:'#f6f6f6'}}>
                        <MDBIcon 
                        style={{float:'left'}}
                        className='mt-3'
                        far
                        icon='calender-alt'
                        size='lg'


                        />
                        <strong style={{float:'left',marginTop:'12px',marginLeft:'2px'}}>
                            {
                                singleBlog && singleBlog.date
                            }
                        </strong>
                        <Badge styleInfo={styleInfo}>
                            {
                                singleBlog && singleBlog.category
                            }

                        </Badge>

                    </div>
                    <MDBTypography className='lead md-0'>
                        {
                            singleBlog && singleBlog.description
                        }

                    </MDBTypography>
                   
                   {relatedPost && relatedPost.length > 0 &&(
                    <>
                        {relatedPost.length >1 &&(
                            <h1>related post</h1>
                        )}
                        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                            {
                                relatedPost.filter((item)=>item._id !==id).map(item=><MDBCol item={item} key={item._id}>
                                    <MDBCard >
                                        <Link to={`/blogs/${item._id}`}>

                                            <MDBCardImage src={item.imageUrl} position='top' ></MDBCardImage>
                                        </Link>
                                        <MDBCardBody>
                                            <MDBCardTitle>{item.title}</MDBCardTitle>
                                            <MDBCardText>{excerpt(item.description)}</MDBCardText>
                                        </MDBCardBody>

                                    </MDBCard>
                                </MDBCol>)
                            }


                        </MDBRow>
                    
                        </>
                   )}
                  

                 </div>
                 
            

        </MDBContainer>
    );
};

export default Blog;