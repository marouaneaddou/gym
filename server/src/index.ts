
import app                          from './app';
import { checkConfig, 
    config, 
    createTempleteSlot }                        from './config';
import { checkDataBaseConnection }  from './db/prisma';
import { setupSwagger }             from './docs/setup';


const port = config.port;

setupSwagger( app );

app.listen(port, '0.0.0.0', async () => {
    checkConfig();
    await checkDataBaseConnection();
    console.log(`Example app listening on port http://localhost:${port}`);
    console.log( `Swagger is running at http://localhost:${port}/docs`);
    await createTempleteSlot();
});
