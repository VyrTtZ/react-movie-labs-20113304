import ForceGraph2D from "react-force-graph-2d";
import { useNavigate } from "react-router";

const GraphView = ({ graph }) => {
	const navigate = useNavigate();

	return (
		<ForceGraph2D
		graphData={graph}
		width={800}
		height={600}
      		nodeLabel="title"
      		nodeColor={(n) => (n.center ? "#f50057" : "#1976d2")}
      		onNodeClick={(node) => navigate(`/movies/${node.id}/graph`)}
    		/>
	);
};

export default GraphView;

