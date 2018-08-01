import React from 'react'
import { create } from "jss"
import JssProvider from "react-jss/lib/JssProvider"
import {createGenerateClassName, jssPreset} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = "insertion-point-jss"

export default (story) => <JssProvider jss={jss} generateClassName={generateClassName}>{story()}</JssProvider>