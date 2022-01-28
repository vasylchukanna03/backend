import Box from '@mui/material/Box';
import {useCallback, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function App() {
    const [form,setForm]= useState({author: '', title:'', content:'', picture:''})
    const [author,setAuthor]= useState('')
    const [title,setTitle]= useState('')
    const [content,setContent]= useState('')
    const [items,setItems]= useState([])

    const handlerSubmit = useCallback(()=>{
        setItems([...items,{title,author,content}])
        axios.post('http://localhost:3001/send',{title,author,content})
    }, [author,content,title])

    useEffect(()=>{
        axios.get('http://localhost:3001/getAll').then((res)=>{setItems(res.data)})
        },[])

    const style = {
        wr: {
            height: '100%',
            position: 'relative'
        },
        item: {
            background: '#e6f7ff',
            padding:  '16px',
            width: '300px',
            borderRadius: '12px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
        },
        itemTitle: {
            width: '200px',
            padding: '8px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.07)',
        },
        itemWr: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        author: {
            padding: '8px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.07)',
        },
        content: {
            marginTop: '20px',
            width: '100%',
            padding: '6px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.07)',
            boxSizing: 'border-box'
        },
        form: {
            position: 'fixed',
            top: '10px',
            left: '10px',
            background: '#e6f7ff',
            padding:  '16px',
            width: '220px',
            borderRadius: '12px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
        }
    }

  return (
    <Box sx={style.wr}>
        {items.map((item)=>{
        return(
            <Box sx={style.item}>
                <Box sx={style.itemWr}>
                    <Box sx={style.itemTitle}>{item.title}</Box>
                    <Box sx={style.author}>{item.author}</Box>
                </Box>
                <Box sx={style.content}>{item.content}</Box>
            </Box>
            )
        })}
        <Box sx={style.form}>
            <TextField onChange={(e)=> setAuthor(e.target.value)} id="standard-basic" label="Author" variant="standard" sx={{marginBottom: '10px'}}/>
            <TextField onChange={(e)=> setTitle(e.target.value)} id="standard-basic" label="Title" variant="standard" sx={{marginBottom: '10px'}} />
            <TextField onChange={(e)=> setContent(e.target.value)} id="standard-basic" label="Text" variant="standard" sx={{marginBottom: '10px'}} />
            {/* <TextField id="standard-basic" label="Picture" variant="standard" sx={{marginBottom: '10px'}} /> */}
            <Button onClick={handlerSubmit} variant="contained">Submit</Button>
        </Box>
    </Box>
  );
}

export default App;