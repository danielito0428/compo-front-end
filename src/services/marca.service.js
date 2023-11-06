import http from "../api/axiosconfig";

class MarcaDataService{
    getAll(){
        return http.get("/marcas");
    }

    getId(id){
        return http.get(`/${id}`);
    }

    create(data){
        return http.post("/marcas",data)
    }

    update(id,data){
        return http.put(`/marcas/${id}`,data)
    }

    delete(id) {
        return http.delete(`/marcas/${id}`);
      }

      findByTitle(name) {
        return http.get(`/marcas/${name}`);
      }
}
export default new MarcaDataService();  