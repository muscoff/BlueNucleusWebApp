import React, { useState, useEffect } from "react";
import "./OnboardingList.css";
import ProgressWheel from "./ProgressWheel.jsx";

import { 
  returnTaskCategory, returnTaskCategoryGroups, returnTaskCategoryDetails 
} from './helper_functions/task_category.js'
import { getCategories } from "./network/category.js"
import { getTasks, getTaskCategoryDetails } from "./network/task.js"
import { 
  getUserTasks, postUserTask, putUserTask, getUserTask 
} from "./network/usertasks.js"
import Collapsable from "./components/Collapsable.jsx";

function OnboardingCell({ task, onClick }) {

  const [isComplete, setIsComplete] = useState(false)

  const handleButtonClick = () => {
    const userid = localStorage.getItem('uid')
    if(!userid) return console.log('no-user-id found')
    setIsComplete((prev) => !prev);
    onClick(task, !isComplete ? 1 : 0)
  }

  return (
    <td>
      <button
        className={`circle-checkbox ${isComplete ? "complete" : ""}`}
        onClick={handleButtonClick}
      >
        {isComplete ? "✔" : ""}
      </button>
      {/* <span>{text}</span> */}
      {/* <span>{task?.title}</span> */}
      <Collapsable title={task?.taskTitle} description={task?.description} />
    </td>
  );
}

function OnboardingList() {
  const [onboardingTasks, setOnBoardingTasks] = useState([])
  const [userTaskIds, setUserTaskIds] = useState([])
  const [userTask, setUserTask] = useState(null)
  const [tasks, setTasks] = useState([])

  const todos = [
    "Verify your information is correct on the profile page",
    "Schedule a time to get your picture taken with Brock",
    "Schedule 1 on 1 meeting with Jonathan",
  ];

  const todos1 = [
    "Complete Git course & upload certificate below.",
    "Read internal CI/CD documentation & answers the following questions...",
  ];

  const todos2 = [
    "Merge a Pull Request that resolves one of this WebApp's Github Issues",
  ];

  const fetchTaskData = async() => {
    setTimeout(()=>{
        getUserTask(
          localStorage.getItem('uid'),
          (data)=>{
            const response = {id: data.id, userid: data.userid, taskids: JSON.parse(data.taskids)}
            setUserTask(response)
            setUserTaskIds(response.taskids)
            const tasks_ids = []
            response.taskids.forEach(task=>{
              tasks_ids.push(task.taskid)
            })

            const task_list = []
            const [generalTask, specificTask] = tasks
            specificTask.forEach(task=>{
              if(tasks_ids.includes(task.taskId)){
                task_list.push(task)
              }
            })
            // Join task_list and the generalTask
            const arr = [...generalTask, ...task_list]
            const group_task_cat = returnTaskCategoryGroups(arr)
            // console.log('group group',group_task_cat)
            setOnBoardingTasks(group_task_cat)
            console.log('arr', group_task_cat)
          },
          (error)=>{
            const [generalTask] = tasks
            const group_task_cat = returnTaskCategoryGroups(generalTask)
            setOnBoardingTasks(group_task_cat)
          }
        )
      },
      3000
    )
  }

  useEffect(()=>{
    getTaskCategoryDetails(
      (response)=>{
        const data = returnTaskCategoryDetails(response)
        setTasks(data)
      },
      (err)=>console.log('failed at getTaskCategoryDetails', err)
    )
    fetchTaskData()
  }, [])

  const onSubmit = (data, status) => {
    // check if user has any assigned tasks 
    // and make a put request else make a POST request
    
    if(userTask){
      const findTask = userTaskIds.find(t=>t.taskid === data.id)
      if(findTask){
        userTaskIds.map(item=>{
          if(item.taskid === data.id) item['completed'] = status
          return item
        })
        // userTask['taskids'] = userTaskIds
        const json = {
          id: userTask.id,
          taskids: JSON.stringify(userTaskIds),
          userid: userTask.userid,
        }
        putUserTask(
          json,
          (data)=>{
            console.log('put-user-task-success',data)
            fetchTaskData()
          },
          (error)=>console.log('put-user-task-error', error)
        )
      }else{
        const json = {
          id: userTask.id,
          taskids: JSON.stringify([...userTaskIds, {taskid: data.id, completed: status, is_active: data.isActive}]),
          userid: userTask.userid,
        }
        putUserTask(
          json,
          (data)=>{
            console.log('post-user-task-success',data)
            fetchTaskData()
          },
          (error)=>console.log('post-user-task-error', error)
        )
      }
    }else{
      const userid = localStorage.getItem('uid')
      if(!userid) return console.log('no-user-id found') // use a proper toast message if possible
      const json = {
        taskids: JSON.stringify([{taskid: data.id, completed: status, is_active: data.isActive}]),
        userid: localStorage.getItem('uid')
      }
      postUserTask(
        json,
        (data)=>{
          console.log('post-user-task-success',data)
          fetchTaskData()
        },
        (error)=>console.log('post-user-task-error', error)
      )
    }
    
  }

  const onboardList = onboardingTasks.length === 0 ? <></> : onboardingTasks.map((item, index)=>{
    return (
      <React.Fragment key={index}>
        {
          item.status && (
            <div className="onboarding-section-title">
              <h2> {item.name} </h2>
              
              <table>
                <tbody>
                {item.data.map((todo, ind) => {
                  const findStatus = userTaskIds.find(u=>u.taskid === todo.taskId)
                  console.log('todo', todo, 'findStatus',findStatus)
                  return (
                    <tr key={ind}>
                      {(todo.taskIsActive === 1 || findStatus?.is_active === 1) && (
                        <OnboardingCell task={todo} onClick={onSubmit} />
                      )}
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          )
        }
      </React.Fragment>
    )
  })

  return (
    <>
      <h1> Onboarding List </h1>
      {onboardList}
    </>
  );
}

export default OnboardingList;

