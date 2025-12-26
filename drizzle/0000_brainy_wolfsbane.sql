CREATE TABLE "pulses" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author_name" varchar(100) NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now()
);
