import React,{useState,useEffect} from 'react'
import "./Todo.css"
const Todo = () => {
    const getlocalstoredtask=()=>
    {
        const tasklist = localStorage.getItem("tasklist");
        if (tasklist) {
            return JSON.parse(tasklist);            
        }
        else
        return [];
    }
    const getlocalcounttitle= () =>{
        const countle = localStorage.getItem("countle");
        if (countle>0) {
            return JSON.parse(countle);    
        }
        return 0;
    }
    const [intask,setintask] = useState("");
    const [item,setitem] = useState(getlocalstoredtask());
    const [count,setcount]=useState(0);
    const [counttitle,setcounttitle]=useState(getlocalcounttitle());
    const [editeditem,setediteditem]=useState("");
    const [togbtn,settogbtn] = useState(false);
    useEffect(() => {        
          document.title = `${counttitle} task left`;
         });
    const additems = () =>
    {
        if(!intask)
        {
            alert("please add a task.");
            const inp = document.getElementById('inp');
            inp.focus();
        }
        else if(intask && togbtn)
        {
            setitem(
                item.map((elem)=>{
                    if (elem.id===editeditem) {
                        return {...elem,name : intask}
                    }
                    else{
                        return elem;
                    }
                })
            )
            setintask("");
            settogbtn(false);
            setediteditem("");
        }
        else
        {
            setcount(count+1);
            const newintask={
                id : count,
                name : intask
            }
            setitem([...item,newintask]);
            setintask("");
            setcounttitle(counttitle+1);
        }
    }
    const edititem = (ind) =>
    {
        const editem = item.find((elem)=>
        {
            return elem.id===ind;
        });
        // editeditem=item.ind;
        setintask(editem.name);
        setediteditem(ind);
        const inp = document.getElementById('inp');
        inp.focus();
        settogbtn(true);
    }
    const deleteitem = (index) =>
    {
        const delitem=item.filter((elem)=>
        {
            return elem.id !== index;
        });
        setitem(delitem);
        setintask("");
        settogbtn(false);
    //    counttitle = counttitle > 0 ? setcounttitle(counttitle-1) : 0;
        if (counttitle > 0) {
            setcounttitle(counttitle-1);
        }
        else{
            setcounttitle(0);
        }
    }
    const clear =()=>
    {
        if (counttitle===0) {
            alert("list is empty");
        }
        else
        {
            setitem([]);
            setintask("");
            setcounttitle(0);
        }
    }
    useEffect(() => {
        localStorage.setItem("tasklist",JSON.stringify(item));
    }, [item])
    useEffect(() => {
        localStorage.setItem("countle",JSON.stringify(counttitle));
    }, [counttitle])
    return (
        <div>  
            <div className="heading">
                <h1>TO DOy.</h1>                 
            </div>     
            
            <div className="main-div">
                <div className="child-div">
                    
                    <figure>
                        <img src="./images/note2.jpg" alt="logo here" />
                        {/* <figcaption>Add a new task here ✌</figcaption> */}
                    </figure>                    
                    <div className="">                    
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">✍</span>
                            <input type="text" className="additems" value={intask} onChange={(e) => setintask(e.target.value)} id="inp" placeholder="Add new task" />
                            {
                                togbtn ? <i className="far fa-edit editbtn" onClick={additems}></i> : <i className="fa fa-plus" onClick={additems}></i>
                            }
                        </div>
                    </div>
                    <div className="showitems">
                        {item.map((elem)=>{
                            return(
                            <div className="eachitem" key={elem.id}>
                            <h3>{elem.name}</h3>
                            <div className="todo-btn">
                                <span><i className="far fa-edit edits" onClick={()=>edititem(elem.id)}></i></span>
                                <span><i className="fas fa-trash delet" onClick={()=>deleteitem(elem.id)}></i></span>
                            </div>
                        </div>
                            )
                        })}
                        
                    </div>
                    <div className="showitems">
                        {/* <button type="button" className="btn btn-success">Add To List</button> */}
                        <span><button type="button" onClick={clear} className="btn btn-danger">Clear List</button></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;
