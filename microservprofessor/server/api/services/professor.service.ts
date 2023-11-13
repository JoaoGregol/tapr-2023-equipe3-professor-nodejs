import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Professor } from "../entities/professor";

export class ProfessorService {
    private container: Container =
        cosmosDb.container("professor");

    async all(): Promise<Professor[]> {
        const { resources: listaProfessores } =
            await this.container.items.readAll<Professor>().fetchAll();

        return Promise.resolve(listaProfessores);
    }
}
export default new ProfessorService();