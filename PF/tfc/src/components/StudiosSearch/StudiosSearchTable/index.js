import {useContext} from "react";
import APIContext from "../../../Contexts/APIContext";

const StudiosSearchTable = ({ perPage, params }) => {
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
            <tr key={studio.location.id}>
                <td>{ params.page + index + 1 }</td>
                <td>{ studio.name }</td>
                <td>{ studio.location.address }, { studio.location.postal_code }</td>
            </tr>
        ))}
        </tbody>
    </table>
}

export default StudiosSearchTable;