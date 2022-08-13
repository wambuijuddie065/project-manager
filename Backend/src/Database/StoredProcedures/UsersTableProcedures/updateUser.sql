CREATE PROCEDURE updateUser(
@id VARCHAR(100),
@name VARCHAR(200),
@email VARCHAR(200),
@password VARCHAR(200),
@role VARCHAR(10),
@isassigned VARCHAR(10),
@project_id VARCHAR(100))
AS
BEGIN
UPDATE UsersTable
SET 
id=@id ,
name=@name, 
email=@email, 
password=@password,
role=@role,
isassigned=@isassigned,
project_id=@project_id

WHERE 
email=@email
END


