import React, { useEffect, useState } from 'react'
import './style.css'
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data } from '../../data/data'


export const InfoBox = (props) => {
    const { stepText, stepTextNumber, textDescription, textInput, progressBar, infoBaseClass, stepTextColor, stepTextNumberColor, textDescriptionColor } = props
    const [Level, setLevel] = React.useState(10);
    const [progressColor, setProgressColor] = React.useState({ color: 'red' })
    const [innerWidth, setInnerWidth] = useState(window.screen.width)
    useEffect(() => {
        const acualWidth = () =>{
            setInnerWidth(window.innerWidth)
        }
        window.addEventListener('resize', acualWidth)
        const timer = setInterval(() => {
            setLevel((newLevel) => newLevel >= 100 ? 100 : newLevel + 10)
        }, 1000)
        return () => {
            window.removeEventListener("resize", acualWidth)
            clearInterval(timer)
        }
    })
    return (
        <div className={infoBaseClass ? infoBaseClass : "infoBox infoBox-container"}>
            <div className={progressBar ? "infoBoxWrapperProgress infoBoxWrapperProgress-container" : "infoBoxWrapper infoBoxWrapper-container"}>
                <div className="startingSteps">
                    <div className="wrapperTextAndDivision">
                    <span className={stepTextColor ? stepTextColor : "startingStepsText"}>{stepText}</span>
                    <span className={stepTextNumberColor ? stepTextNumberColor : "startingStepsNumberText"}>{stepTextNumber}</span>
                    </div>
                    <div className="divisionLine"></div>
                </div>
                <div className="textDescription">
                    <span className={textDescriptionColor ? textDescriptionColor :"textDescriptionSpan"}>{textDescription}</span>
                </div>
                <div className="inputTag">
                    {textInput === true ?
                        (
                            <input type="text" placeholder="#scscscss" />
                        ) : ""
                    }
                    {progressBar === true ? (
                        <div className="graphAndProgressBar">
                            <div>
                                <Box sx={{ width: '100%', height:"30px", backgroundColor:'white', display:"flex", justifyContent:"center", alignItems:'center', border:"1px solid black" }}>
                                    <LinearProgress variant="determinate" color="secondary" style={{height:"10px", width:"80%"}} value={Level} />
                                </Box>
                            </div>

                        </div>
                    ) : ""}
                </div>
                <div className="buttonIconWrapper">
                <div className="buttonIcon">
                    <div className="button">
                        <button>OK</button>
                    </div>
                </div>
                <div className="iconWrapper">
                    <CheckIcon className="iconClass" />
                </div>
                </div>
            </div>
            {progressBar === true ? (<div className="divisonBetweenGraph"></div>) : ""}

            <div className="graphClass">
                {progressBar && Level === 100 ? (
                    <div className="wrapperGraph">
                        <div className="graphDivWrapper graphDivWrapper-container">
                            <div className="graph">
                                <LineChart width={innerWidth <= 575  ? 244 : 400} height={innerWidth <= 575 ? 280 : 300} data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                            <div className="loremText">
                                <span>Lorem Ipsum Test</span>
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, nobis?</span>
                            </div>
                        </div>
                            <div className="submitButton">
                                <button>
                                    Submit 
                                </button>
                            </div>
                    </div>
                ) : ""}
            </div>
        </div>
    )
}