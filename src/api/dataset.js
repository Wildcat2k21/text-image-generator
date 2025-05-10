import http from "./http";

export const sendImages = async (data) => {
    const formData = new FormData();

    data.forEach((item, index) => {
        formData.append(
            `images[${index}]`,
            item.image,
            `image_${index}.jpg` // правильное расширение
        );
        formData.append(`text_metrics[${index}]`, JSON.stringify(item.textMetrics));
    });


    const response = await http.post("/images-data", formData);
    return response.data;
};
