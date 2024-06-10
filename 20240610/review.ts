import { BookReview } from "@models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

export const reviewsById = http.get(
  "http://localhost:3333/reviews/:bookId",
  () => {
    const data: BookReview[] = Array.from({ length: 8 }).map((_, index) => ({
      id: index,
      userName: `${faker.person.lastName()}${faker.person.firstName()} `,
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    }));
    return HttpResponse.json(data, { status: 200 });
  }
);

export const addReview = http.post(
  "http://localhost:3333/reviews/:bookId",
  () => {
    return HttpResponse.json(
      {
        message: "리뷰가 등록되었습니다.",
      },
      { status: 200 }
    );
  }
);
