import { createRoot, html, GApp  } from "gloomjs"
import App from "./components/app"

GApp
.createRoot( App(), document.body )