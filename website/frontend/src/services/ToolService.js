import http from "../http-common";
class ToolService{
    getAll() {
        return http.get('tools');
    }
}
export default new ToolService();