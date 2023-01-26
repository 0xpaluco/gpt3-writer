create table "public"."authors" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "value" text,
    "description" text,
    "avatar" text default '""'::text
);


alter table "public"."authors" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "website" text
);


alter table "public"."profiles" enable row level security;

create table "public"."stats" (
    "id" uuid not null,
    "used_tokens" numeric not null default '0'::numeric,
    "remaining_tokens" numeric not null default '0'::numeric,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."stats" enable row level security;

create table "public"."threads" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "content" text default ''::text,
    "user_id" uuid,
    "headline" text,
    "context" text,
    "topic" bigint,
    "author" bigint
);


alter table "public"."threads" enable row level security;

create table "public"."topics" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "value" text
);


alter table "public"."topics" enable row level security;

CREATE UNIQUE INDEX authors_pkey ON public.authors USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX stats_pkey ON public.stats USING btree (id);

CREATE UNIQUE INDEX threads_pkey ON public.threads USING btree (id);

CREATE UNIQUE INDEX topics_pkey ON public.topics USING btree (id);

alter table "public"."authors" add constraint "authors_pkey" PRIMARY KEY using index "authors_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."stats" add constraint "stats_pkey" PRIMARY KEY using index "stats_pkey";

alter table "public"."threads" add constraint "threads_pkey" PRIMARY KEY using index "threads_pkey";

alter table "public"."topics" add constraint "topics_pkey" PRIMARY KEY using index "topics_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."stats" add constraint "stats_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."stats" validate constraint "stats_id_fkey";

alter table "public"."threads" add constraint "threads_author_fkey" FOREIGN KEY (author) REFERENCES authors(id) not valid;

alter table "public"."threads" validate constraint "threads_author_fkey";

alter table "public"."threads" add constraint "threads_topic_fkey" FOREIGN KEY (topic) REFERENCES topics(id) not valid;

alter table "public"."threads" validate constraint "threads_topic_fkey";

alter table "public"."threads" add constraint "threads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."threads" validate constraint "threads_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

create policy "Enable read access for all users"
on "public"."authors"
as permissive
for select
to public
using (true);


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Enable all actions for users based on user_id"
on "public"."stats"
as permissive
for all
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable all actions for users based on author"
on "public"."threads"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."topics"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."topics"
as permissive
for select
to public
using (true);


