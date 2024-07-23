import AxiosInstance from "./AxiosInstance";

const DatePlannerAxios = {
  // 모든 코스 조회
  getAllCourses: async () => {
    try {
      console.log("📡 Fetching all courses...");
      const response = await AxiosInstance.get("/course");
      console.log("✅ Fetched all courses:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
      throw error;
    }
  },

  // 특정 ID의 코스 조회
  getCourseById: async (id) => {
    try {
      console.log(`📡 Fetching course with ID ${id}...`);
      const response = await AxiosInstance.get(`/course/${id}`);
      console.log(`✅ Fetched course with ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching course with ID ${id}:`, error);
      throw error;
    }
  },

  // 새로운 코스 생성
  createCourse: async (courseData) => {
    try {
      console.log("1 Creating new course:", courseData);
      const response = await AxiosInstance.post("/course", courseData);
      console.log("2 Created new course:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating course:", error);
      throw error;
    }
  },

  // 코스 수정
  updateCourse: async (id, courseData) => {
    try {
      console.log(`📡 Updating course with ID ${id}:`, courseData);
      const response = await AxiosInstance.put(`/course/${id}`, courseData);
      console.log(`✅ Updated course with ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating course with ID ${id}:`, error);
      throw error;
    }
  },

  // 코스 삭제
  deleteCourse: async (id) => {
    try {
      console.log(`📡 Deleting course with ID ${id}...`);
      await AxiosInstance.delete(`/course/${id}`);
      console.log(`✅ Deleted course with ID ${id}`);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting course with ID ${id}:`, error);
      throw error;
    }
  },

  //커플아이디로 코스 검색
  getCoursesByCoupleName: async (coupleName) => {
    console.log("coupleName axios", coupleName);
    try {
      const response = await AxiosInstance.get(`/course/search/${coupleName}`);
      console.log('axios return')
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default DatePlannerAxios;
