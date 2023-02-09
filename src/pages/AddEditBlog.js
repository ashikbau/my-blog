import React,{useEffect, useState} from 'react';
import { MDBValidation,MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate, useParams } from 'react-router-dom';


// ixksmqv8

const initialState = {
    title:" ",
    description:" ",
    category:" ",
    imageUrl:" "
}

const options = ['travel','Fashion','Fitness','Sports','Food','Tech']

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryError,setCategoryError] = useState(null);
    const [editBlog,setEditBlog]= useState(false)
    const {title,description,category,imageUrl} = formValue;
const navigate = useNavigate();
const {id}= useParams();
useEffect(()=>{
    if(id){
        setEditBlog(true);
        getSingleBlog(id)
    } else{
        setEditBlog(false)
        setFormValue({...initialState})
    }
    
},[id])

const getSingleBlog=async(id)=>{
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if(singleBlog.status === 200){
        setFormValue({...singleBlog.data})

    } else{
        toast.error('Something Went Wrong')
    }
   

}



const getDate =()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,'0');
    let mm = String(today.getMonth() + 1).padStart(2,'0');
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;

}

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!category){
            setCategoryError('please select category')
        }
        const imageValidation = !editBlog ? imageUrl :true;
        if(title && description && imageUrl && category){
            const currentDate = getDate();
            if (!editBlog){
                const updatedBlogData = {...formValue, date: currentDate}
                const response = await axios.post("http://localhost:5000/blogs",updatedBlogData);
            
                if (response.status === 200){
                    toast.success('Blog is created successfully')
                } else{
                    toast.error('Something went wrong')
                } 
            } else{
                const response = await axios.put(`http://localhost:5000/blogs/${id}`,formValue);
            
                if (response.status === 200){
                    toast.success('Blog is updated successfully')
                } else{
                    toast.error('Something went wrong')
                } 

            }
            
           
          setFormValue({title : " ",description: " ",category:" ",imageUrl:" "})
          navigate("/")
        }

    }
    const onInputChange = (e)=>{
        setCategoryError(null)
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value})

    }
    const onUploadImage = (file)=>{
        const formData = new FormData();
        formData.append('file',file)
        formData.append('upload_preset','ixksmqv8')
        axios.post('https://api.cloudinary.com/v1_1/duogpo699/image/upload',formData).then(res=>{
           toast.info('Image added successfully') 
           setFormValue({...formValue,imageUrl: res.data.url})
        }).catch((err=>{
            toast.error('Something went wrong')
        }))

    }
    const onCategoryChange = (e)=>{
        setFormValue({...formValue,category: e.target.value})

    }


    return (
        <MDBValidation className='row g-3' style={{marginTop : '100px'}} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>{editBlog ? 'Update Blog' : ' Add Blog'}</p>
            <div style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center"
            }}>
                <MDBInput
                value={title || ""}
                name='title'
                type='text'
                onChange={onInputChange}
                required
                label="Title"
                validation = " please provide a title"
                invalid
                ></MDBInput>
                <br />
                <textarea
                value={description || ""}
                name='description'
                type='text'
                textarea
                onChange={onInputChange}
                required
                label="description"
                validation = " please provide a description"
                
                rows={4}
                invalid
                ></textarea>
                <br />
                {
                    !editBlog &&(
                        <>
                        <MDBInput
              
               
              type='file'
              onChange={(e)=>onUploadImage(e.target.files[0])}
              required
              
              validation = " please provide a description"
              
              rows={4}
              invalid
              ></MDBInput>
              <br />
                        </>

                    )
                }
                
                <select className='categoryDropDown' onChange={onCategoryChange} value={category}>
                    <option value="">Please Select Category</option>
                    {
                        options.map((option,index)=>(<option
                        value={option || ""}
                        key={index}
                        
                        >{option}</option>))
                    }
                </select>
                {
                    categoryError &&
                    <div className="categoryerrorclass">{categoryError}</div>
                }
                <br />
                <MDBBtn type='submit' style={{marginRight:'10px'}}>{editBlog ? 'Update' : 'Add'}</MDBBtn>
                <MDBBtn color='danger' style={{marginRight:'10px'}} onClick={()=>navigate("/")}>Go Back</MDBBtn>

            </div>

        </MDBValidation>
    );
};

export default AddEditBlog;