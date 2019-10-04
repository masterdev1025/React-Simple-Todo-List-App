import React, { Fragment, useState } from 'react';
import { initialTasks, additionalTasks } from '../Tasks';
import Collapsible from 'react-collapsible';
import './index.scss';
import checkimg from '../check.png';
export const App = () => {
  const [list, setList] = useState(initialTasks);
  const [list2, setList2] = useState(additionalTasks);
  // const [ menuActive, setMenuState ] = useState(false);

  const updateInitialTasks = (activities,activitiesState, additionalTasks, id, task) => {
    if(additionalTasks == [] || additionalTasks == null)
    {

    } else {
      setList(list.concat({activities: activities,activitiesState:activitiesState, additionalTasks: additionalTasks, id: id, task: task}));
    }
    setList2(list2.filter(item => item.id !== id));
  };

  // const test = () => {
  //   setMenuState(!menuActive)
  //
  //   // setList(
  //   //   list.map(item => {
  //   //     if (item.id === id) {
  //   //       return { ...item, complete: !item.complete };
  //   //     } else {return item;}
  //   //   })
  //   // );
  // };
  const updateActivities = (item, activeId) => {
       var activitiesState = item.activitiesState;
       activitiesState[activeId] = !activitiesState[activeId];
       updateInitialTasks(item.activities, activitiesState, null, item.id, item.task);
       if(renderNumber(item) == 0)
       {
          item.complete = true;
       }
       updateInitialTasks(item.activities, activitiesState, null, item.id, item.task);
  }
  const renderNumber = (item) => {
    var remainA = 0;
    for(var i=0; i<item.activitiesState.length; i++)
    {
      if(item.activitiesState[i] == false || item.activitiesState[i] == 0)
      {
          remainA++;
      }
    }
    if(remainA > 0) {
      item.complete = false;
      return remainA + "activities";
    }
    else{
      item.complete = true;
    } return "completed!";
  }
  
  const renderCompleteClassName = (name) =>{
    console.log(name);
    if(name == true) return "complete";
    else return "";
  }
  return (
    <Fragment>
      <h5>Tracking your progress</h5>
      <p>You told us you needed <br />help with these topics</p>

      <ul className = "ul1">
        {list.map(item => (
          <li key={item.id} className = {renderCompleteClassName(item.complete)}>
            { item.activities ?
              <Collapsible trigger={
                <div>
                  {item.task}
                  <span className='activities--link'>{renderNumber(item)} </span>
                </div>
              } transitionTime={200}>
                <ul>
                  { item.activities.map((item1, index) =>
                    <li key={index}
                      onClick = {()=>updateActivities(item, index)}
                    >
                      {
                        
                        item.activitiesState[index] ?
                        <img src={checkimg} style = {{width:"32px"}} alt={''}/>
                        : <img src={'https://i.ibb.co/s32JZ33/2.jpg'} alt={''}/> 
                        // renderImg1(item.activitiesState[index])
                      }
                      { item1 }
                    </li>)
                  }
                </ul>
              </Collapsible>
            : null }
          </li>
        ))}
      </ul>

      { list2.length > 0 ? <p>More activities to help get you going</p> : null }

      <ul className='activities--more'>
        {list2.map(item => (
          <li key={item.id}>
            {item.task}
            <span className='activities--link' onClick={
              () => updateInitialTasks(item.activities, item.activitiesState, item.activities, item.id, item.task)
            }>+ add</span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
