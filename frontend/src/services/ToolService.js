import http from "../http-common";
class ToolService{
    getAll() {
        return http.get('tools');
    }
    findByName(toolName){
        return http.get(`/tools?toolName=${toolName}`);
    }
    getAdd() {
        return http.get("/new/tool");
    }
    get(id) {
        return http.get(`tools/${id}`);
    }
    
    add(data) {
        return http.post("/tools", data);
    }
    
}
export default new ToolService();