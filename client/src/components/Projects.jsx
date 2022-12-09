import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import {GET_PROJECTS} from '../queries/projectQueries'
import ProjectCard from "./ProjectCard"


const Projects = () => {
const {data, error, loading} = useQuery(GET_PROJECTS);
    if (loading) return <Spinner />;
    if (error) return <h3>Something Went Wrong</h3>;
    
  return (
    <>
        <h3>PROJECTS</h3>
        {data.projects.length > 0 ? (
            <div className="row">
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} 
                    />
                )) }
            </div>
            ) : (
            <p>No Projects</p>
            )
        }
    </>
  )
}

export default Projects