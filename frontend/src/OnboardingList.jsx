import React, { useState, useEffect } from "react";
import "./OnboardingList.css";
import ProgressWheel from "./ProgressWheel.jsx";

import { returnTaskCategory, returnTaskCategoryGroups } from './helper_functions/task_category.js'
import { getCategories } from "./network/category.js"
import { getTasks } from "./network/task.js"
import { 
  getUserTasks, postUserTask, putUserTask, getThisUserTask 
} from "./network/usertasks.js"
import Collapsable from "./components/Collapsable.jsx";

function OnboardingCell({ task, onClick }) {

  const [isComplete, setIsComplete] = useState(false)

  const handleButtonClick = () => {
    setIsComplete((prev) => !prev);
    onClick(task?.original_task, !isComplete ? 1 : 0)
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
      <Collapsable title={task?.title} description={task?.description} />
    </td>
  );
}

function OnboardingList() {
  const [onboardingTasks, setOnBoardingTasks] = useState([])
  const [userTaskIds, setUserTaskIds] = useState([])
  const [userTask, setUserTask] = useState(null)

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
    getCategories(
      (data)=>{
        getTasks(
          (res)=>{
            const [generalTask, specificTask] = returnTaskCategory(res, data)
            console.log('generaTask', generalTask)
            console.log('specificTask',specificTask)
            getThisUserTask(
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
                specificTask.forEach(task=>{
                  if(tasks_ids.includes(task.id)){
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
                const group_task_cat = returnTaskCategoryGroups(generalTask)
                setOnBoardingTasks(group_task_cat)
              }
            )
          },
          (err)=>console.log('error', err)
        )
      },
      (error)=>console.log('get-categories-error', error)
    )
  }

  useEffect(()=>{
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
              {/* <div>
                <div className='flex-row1'>
                {item.data.map((todo, ind) => {
                  const findStatus = userTaskIds.find(u=>u.taskid === todo.id)
                  console.log('todo', todo, findStatus)
                  return (
                    <div key={ind}>
                      {(todo.is_active === 1 || findStatus?.is_active === 1) && (
                        <OnboardingCell task={todo.original_task} onClick={onSubmit} />
                      )}
                    </div>
                  )
                })}
                </div>
              </div> */}
              <table>
                <tbody>
                {item.data.map((todo, ind) => {
                  const findStatus = userTaskIds.find(u=>u.taskid === todo.id)
                  console.log('todo', todo, findStatus)
                  return (
                    <tr key={ind}>
                      {(todo.is_active === 1 || findStatus?.is_active === 1) && (
                        <OnboardingCell task={todo.original_task} onClick={onSubmit} />
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
      {/* <div className="onboarding-section-title">
        <h2> House Cleaning </h2>
        <table>
          {todos.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div> */}

      {/* <div className="onboarding-section-title">
        <h2> Technical Learning </h2>
        <table>
          {todos1.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div> */}

      {/* <div className="onboarding-section-title">
        <h2> Code Changes </h2>
        <table>
          {todos2.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div> */}
    </>
  );
}

export default OnboardingList;

