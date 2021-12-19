import http from "../http-common";
class StudentService{
    getAll() {
        return http.get('students');
    }
    findByName(name){
        return http.get(`students?name=${name}`);
    }
    get(id) {
        return http.get(`students/${id}`);
    }
    add(data) {
        return http.post("/students", data);
    }
}
export default new StudentService();