import React, { useEffect} from 'react'

const Person = (props) =>{
    useEffect(()=>{

        console.log("Person Working");
});

return(
    <div>
<p> Hello My name is {props.Name} </p>
<p>{props.children}</p>
</div>
)
};

export default Person;