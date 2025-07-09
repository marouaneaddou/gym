
import app from './app';
import { config } from './config';
import { checkDataBaseConnection } from './db/prisma';

const port = config.port; 

app.listen(port, async () => {
    await checkDataBaseConnection();
    console.log(`Example app listening on port http://localhost:${port}`);
});
