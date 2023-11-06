import http from "../api/axiosconfig";

class MarcaDataService{
    getAll(){
        return http.get();
    }

    getId(id){
        return http.get(`/${id}`);
    }

    create(data){
        return http.post(data)
    }

    update(id,data){
        return http.put(id,data)
    }

    delete(id) {
        return http.delete(`/${id}`);
      }

      findByTitle(name) {
        return http.get(`/byName?name=${name}`);
      }
}
export default new MarcaDataService();