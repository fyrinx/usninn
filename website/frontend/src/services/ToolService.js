import http from "../http-common";
class ToolService{
    getAll() {
        return http.get('tools');
    }
    findByName(name){
        return http.get(`tools?toolName=${name}`);
    }
    get() {
        return http.get('tools');
    }
}
export default new ToolService();