import {useContext} from "react";
import APIContext from "../../../Contexts/APIContext";
import {Link} from "react-router-dom";

const StudiosListTable = ({ perPage, params }) => {
    const { studios } = useContext(APIContext);

    return <table>
        <thead>
        <tr>
            <th> # </th>
            <th> name </th>
            <th> address </th>
        </tr>
        </thead>
        <tbody>
        {studios.map((studio, index) => (
            <tr key={studio.id}>
                <td>{ params.page + index + 1 }</td>
                {/*<td>{ studio.name }</td>*/}
                <td><Link to={`details/${studio.id}`}>{studio.name}</Link></td>
                <td>{ studio.location.address }, { studio.location.postal_code }</td>
            </tr>
        ))}
        </tbody>
    </table>
}

export default StudiosListTable;
