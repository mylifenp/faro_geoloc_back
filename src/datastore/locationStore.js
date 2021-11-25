import Datastore from "nedb-promises";

export default Datastore.create("./locations.db");
// export default Datastore.create("nedb://memory");
