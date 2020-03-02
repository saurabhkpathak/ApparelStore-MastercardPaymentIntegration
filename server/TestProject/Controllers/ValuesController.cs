using ApparelStore.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ApparelStore.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TestProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ApparelStoreContext _context;
        public ValuesController(ApparelStoreContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public async Task<List<Clothing>> GetAllAsync()
        {
            var result = await _context.Clothing.ToListAsync();
            return result;
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("AddClothing")]
        public async Task<int> Post([FromBody] string value)
        {
            var cloth = JsonConvert.DeserializeObject<Clothing>(value);
            await _context.Clothing.AddAsync(cloth);
            var result = await _context.SaveChangesAsync();
            return result;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
