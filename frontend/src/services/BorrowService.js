import http from "../http-common";
class BorrowService{
    getAll() {
        return http.get('borrow');
    }
    getAllByStudent(id){
        return http.get(`borrow/student/${id}`);
    }
    getAllByTool(id){
        return http.get(`borrow/tool/${id}`);
    }
    get(id){
        return http.get(`borrow/${id}`);
    }
    findByName(name){
        return http.get(`students?lastName=${name}`);
    }
    
}
export default new BorrowService();