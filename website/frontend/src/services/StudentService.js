import http from "../http-common";
class StudentService{
    getAll() {
        return http.get('students');
    }
    findByName(name){
        return http.get(`students?lastName=${name}`);
    }
    get(id) {
        return http.get(`students/${id}`);
    }
}
export default new StudentService();