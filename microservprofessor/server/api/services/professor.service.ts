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

    async getById(id: string): Promise<Professor> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Professor c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };

        const { resources: listaProfessores }
            = await this.container.items.query(querySpec).fetchAll();

        return Promise.resolve(listaProfessores[0]);
    }

    async saveNew(professor: Professor): Promise<Professor> {
        professor.id = "";
        await this.container.items.create(professor);

        return Promise.resolve(professor);
    }

    async update(id: string, professor: Professor): Promise<Professor> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Professor c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };

        const { resources: listaProfessores }
            = await this.container.items.query(querySpec).fetchAll();

        const professorAntigo = listaProfessores[0];

        professorAntigo.nome = professor.nome;
        professorAntigo.materia = professor.materia;
        await this.container.items.upsert(professorAntigo)

        return Promise.resolve(professorAntigo);
    }

    async delete(id: string): Promise<string> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Professor c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };

        const { resources: listaProfessores }
            = await this.container.items.query(querySpec).fetchAll();
            
        for (const professor of listaProfessores) {
            await this.container.item(professor.id, professor.id).delete();
        }

        return Promise.resolve(id);
    }
}

export default new ProfessorService();