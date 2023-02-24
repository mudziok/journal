CREATE OR REPLACE FUNCTION trending(vusername text)
  returns table (username text)
AS
$$
    select username from (select
    author_username as username,
    count(author_username) as rating,
	author_username in (select followee_username from follows where follower_username = vusername) as isFollowed
    from
    (select author_username from entries where day = CURRENT_DATE) entries
    LEFT JOIN
    (select entry_author_username from reactions where entry_day = CURRENT_DATE) reactions
    on entry_author_username = author_username
    group by author_username) as sub
    order by isFollowed desc, rating desc;
$$
LANGUAGE sql;