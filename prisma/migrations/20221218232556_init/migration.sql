-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "salt" VARCHAR(64) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(64) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries" (
    "author_username" TEXT NOT NULL,
    "day" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "image_src" VARCHAR(128),

    CONSTRAINT "entries_pkey" PRIMARY KEY ("author_username","day")
);

-- CreateTable
CREATE TABLE "reactions" (
    "emote" TEXT NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "entry_author_username" VARCHAR(64) NOT NULL,
    "entry_day" DATE NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("username","emote","entry_author_username","entry_day")
);

-- CreateTable
CREATE TABLE "comments" (
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_username" VARCHAR(64) NOT NULL,
    "entry_author_username" VARCHAR(64) NOT NULL,
    "entry_day" DATE NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("author_username","entry_author_username","entry_day")
);

-- CreateTable
CREATE TABLE "images" (
    "src" VARCHAR(128) NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("src")
);

-- CreateTable
CREATE TABLE "follows" (
    "follower_username" VARCHAR(64) NOT NULL,
    "followee_username" VARCHAR(64) NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("follower_username","followee_username")
);

-- CreateTable
CREATE TABLE "badges" (
    "name" VARCHAR(64) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "recipient_username" VARCHAR(64) NOT NULL,
    "image_src" VARCHAR(128),

    CONSTRAINT "badges_pkey" PRIMARY KEY ("name","recipient_username")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_author_username_fkey" FOREIGN KEY ("author_username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_image_src_fkey" FOREIGN KEY ("image_src") REFERENCES "images"("src") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_entry_author_username_entry_day_fkey" FOREIGN KEY ("entry_author_username", "entry_day") REFERENCES "entries"("author_username", "day") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_username_fkey" FOREIGN KEY ("author_username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_entry_author_username_entry_day_fkey" FOREIGN KEY ("entry_author_username", "entry_day") REFERENCES "entries"("author_username", "day") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_username_fkey" FOREIGN KEY ("follower_username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followee_username_fkey" FOREIGN KEY ("followee_username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_recipient_username_fkey" FOREIGN KEY ("recipient_username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_image_src_fkey" FOREIGN KEY ("image_src") REFERENCES "images"("src") ON DELETE SET NULL ON UPDATE CASCADE;
