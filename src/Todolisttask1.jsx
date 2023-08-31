
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan,faPencil,faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'; // 導入icon
import { useState } from "react";
const listData = [
    { id: 1, text: '第一次學React.....',completed: false },
    { id: 2, text: '感謝卡斯柏老師React讀書會直播',completed: false },
    { id: 3, text: '找校長加碼讀書會直撥獎品啦，交作業才有動力' ,completed: false},
    { id: 4, text: '找穎旻老師學ＪＳ，好棒棒(｡◕∀◕｡)' ,completed: false},
    { id: 5, text: '約同學來報名JS直播班',completed: false },
];

function Todolisttask1(){
  const [text,setText]=useState("")
  const [list,setList]=useState(listData)
  const [change,setChange]=useState("all")
  const [edit,setEdit]=useState("")
  const [target,setTarget]=useState("")
  
  //新增代辦
  const addItem=()=>{
    if(text.length===0)return
    setList([...list,{
      id:new Date().getTime(),
      text,
      completed:false
    }])
    setText("")
  }

  //刪除個別代辦
  const delItem=(id)=>{
    setList(list.filter((listItem)=>listItem.id!==id))
  }

  //刪除已完成
  const delAllItem=()=>{
    const Numlist=newlist.filter((item)=>item.completed===false)
    setList(Numlist)
  }

  //切換個別代辦狀態
  const togglecheck = (id) => {
  const tempList = list.map((listItem) => 
    listItem.id === id?{ ...listItem,completed: !listItem.completed}:listItem);
  setList(tempList);
  };
  
  // 改變分頁狀態
  const newlist=list.filter((item)=>{
    if(change==="all"){
      return item
    }else if(change==="work"){
      return item.completed===false
    }else{
      return item.completed!==false
    }
  })

  //已完成項目
  const totalNum=()=>{
    const Numlist=newlist.filter((item)=>item.completed===false)
    return Numlist.length
  }

  //修改個別項目
  const editTodo=(id)=>{
    const templist=list.map((item)=>item.id===id?{...item,text:edit}:item)
    setList(templist)
    setEdit("")
    setTarget("")
  }

  return(
    <>
    <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>六角同學的代辦</span></a></li>
                <li><a href="#loginPage">登出</a></li>
            </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" value={text} onChange={(e)=>{setText(e.target.value)}}/>
                    <a href="#" onClick={()=>{addItem()}}>
                        <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" className={change === "all" ? "active" : ""} onClick={()=>setChange("all")}>全部</a></li>
                        <li><a href="#" className={change === "work" ? "active" : ""} onClick={()=>setChange("work")}>待完成</a></li>
                        <li><a href="#" className={change === "done" ? "active" : ""} onClick={()=>setChange("done")} >已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                          {list.length===0?(<>
                          <li>
                            <label className="todoList_label">
                                   目前尚無待辦事項
                            </label>
                            </li>
                          </>):
                          (<>
                          {newlist.map((item)=>{
                            return(
                              <li key={item.id}>
                                {target===item.id?(
                                  <>
                                  <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" checked={item.completed} onClick={()=>{togglecheck(item.id)}}/>
                                    <input type="text"
                                      className="editInput"
                                      value={edit || item.text}
                                      onChange={(e) => setEdit(e.target.value)}/>
                                      <a href="" className="icon" onClick={(e)=> {e.preventDefault(),editTodo(item.id)}}>
                                        <FontAwesomeIcon icon={faCheck} />
                                      </a>
                                      <a href="" className="icon" onClick={(e)=> {e.preventDefault(),setTarget('')}}>
                                        <FontAwesomeIcon icon={faXmark} />
                                      </a>
                                  </label> 
                                      </>
                                ):(
                                  <>
                                  <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" checked={item.completed} onClick={()=>{togglecheck(item.id)}}/>
                                    <span>{item.text}</span>
                                  </label>
                                  <a href="#" onClick={(e)=>{e.preventDefault(),setEdit(""),setTarget(item.id)}}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </a>
                                <a href="#" onClick={(e)=>{e.preventDefault(),delItem(item.id)}}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </a>
                                </>
                                )}
                              </li>
                            )
                          })}
                          </>)}

                        </ul>
                        <div className="todoList_statistics">
                            <p> {totalNum()} 個代辦項目</p>
                            <a href="#" onClick={delAllItem}>清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todolisttask1;