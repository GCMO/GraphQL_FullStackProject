
const ProjectCard = ({project}) => {
  return (
    <div className="col-md-6 mt-3">
        <div className="card mb-3">
            <div className="card-body">
                <span className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text"> Status: <strong>{project.status}</strong></p>
                </span>
                    <h6 className="card-text">{project.description}</h6>

            </div>
        </div>
    </div>
  );
}

export default ProjectCard