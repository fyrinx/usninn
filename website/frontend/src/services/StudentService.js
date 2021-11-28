import http from "../http-common";
class StudentService{
    getAll() {
        return http.get('students');
    }
    findByName(name){
        return http.get(`students?lastName=${name}`);
    }
    get() {
        return http.get('students');
    }
}
export default new StudentService();