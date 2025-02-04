import { createRoot, html, GApp  } from "gloomjs"
import ProgressBar from "./components/progress-bar"
import Question from "./components/question"
import Quiz from "./components/quiz"
import Statistics from "./components/statistics"
import App from "./components/app"

GApp
.registerComponent( ProgressBar )
.registerComponent( Question )
.registerComponent( Statistics )
.registerComponent( Quiz )
.createRoot( App(), document.body )