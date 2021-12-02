import http from "../http-common";
class ToolService{
    getAll() {
        return http.get('tools');
    }
    findByName(name){
        return http.get(`tools?toolName=${name}`);
    }
    get(id) {
        return http.get(`tools/${id}`);
    }
}
export default new ToolService();