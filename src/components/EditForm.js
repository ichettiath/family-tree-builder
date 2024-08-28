//JavaScript
var editForm = function () {
   this.nodeId = null;
};

editForm.prototype.init = function (obj) {
   var that = this;
   this.obj = obj;
   this.editForm = document.getElementById("editForm");
   this.nameInput = document.getElementById("name");
   this.titleInput = document.getElementById("title");
   this.cancelButton = document.getElementById("cancel");
   this.saveButton = document.getElementById("save");
   this.addPartnerButton = document.getElementById("add-partner");
   this.addChildButton = document.getElementById("add-child");
   this.addParentButton = document.getElementById("add-parent");

   this.cancelButton.addEventListener("click", function () {
      that.hide();
   });

   this.saveButton.addEventListener("click", function () {
      var node = this.obj.get(that.nodeId);
      node.name = that.nameInput.value;
      node.title = that.titleInput.value;

      this.obj.updateNode(node);
      that.hide();
   });

   this.addPartnerButton.addEventListener("click", function () {
      if (that.addPartnerCallback) {
         that.addPartnerCallback(that.nodeId);
      }
      that.hide();
   });

   this.addChildButton.addEventListener("click", function () {
      if (that.addChildCallback) {
         that.addChildCallback(that.nodeId);
      }
      that.hide();
   });
};

editForm.prototype.setAddPartnerCallback = function (callback) {
   this.addPartnerCallback = callback;
};

editForm.prototype.setAddChildCallback = function (callback) {
   this.addChildCallback = callback;
};

editForm.prototype.show = function (nodeId) {
   this.hide();
   this.nodeId = nodeId;

   var left = document.body.offsetWidth / 2 - 150;
   this.editForm.style.display = "block";
   this.editForm.style.left = left + "px";
   document.getElementById("editForm_title").innerHTML = "Edit";

   var node = this.obj.get(nodeId);
   this.nameInput.value = node.name;
   this.titleInput.value = node.title;
};

editForm.prototype.hide = function (showldUpdateTheNode) {
   this.editForm.style.display = "none";
};

editForm.prototype.on = function (event, handler) {
   // This method does nothing but satisfies the interface requirement
   return this;
};

// Implement the `content` method to return a simple placeholder string
editForm.prototype.content = function (nodeId, data) {
   // Return a placeholder string representing the content for the edit form
   return `Content for node ${nodeId}`;
};

// Implement the `setAvatar` method with a no-op implementation
editForm.prototype.setAvatar = function (url) {
   // This method does nothing but satisfies the interface requirement
};

export default editForm;
