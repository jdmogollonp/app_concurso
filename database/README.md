# Load the database information

1) Install MySQL if you don't have it
2) Log in to your MySQL instance using <b>mysql -u [user] -p</b>
3) Run <b>create database smart_tools;</b> and <b>exit</b>
4) Run <b>mysql -u [usuario] -p smart_tools < [path]/smart_tools_empty.sql</b>

# Export the database information

1) Run <b>mysqldump -u [usuario] -p smart_tools > smart_tools.sql</b>